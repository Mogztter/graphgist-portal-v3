import { getGraphGistByUUID } from "./utils";
import { neo4jgraphql } from "neo4j-graphql-js";

export const getGraphGistCandidate = async (obj, args, context, info) => {
  const session = context.driver.session();
  const txc = session.beginTransaction();
  const { uuid: graphGistUUID } = args;

  try {
    const graphGist = await getGraphGistByUUID(txc, graphGistUUID);
    if (!graphGist) {
      throw new Error("GraphGist not found");
    }

    const result = await txc.run(
      `
      MATCH (g:GraphGist {uuid: $uuid})<-[:IS_VERSION]-(c:GraphGistCandidate)
      RETURN c
    `,
      { uuid: graphGistUUID }
    );

    let candidateUUID;
    if (result.records.length > 0) {
      await txc.commit();
      candidateUUID = result.records[0].get("c").properties.uuid;
    } else {
      candidateUUID = uuidv4();
      const createResult = await txc.run(
        `
        MATCH (g:GraphGist {uuid: $uuid})
        MERGE (c:GraphGistCandidate)-[r:IS_VERSION]->(g)
        SET c = g
        SET c.uuid = $candidateUUID
        WITH c, g

        MATCH (g)<-[r:WROTE]-(p)
        WITH collect(p) as endNodes, c, g
        FOREACH(pp in endNodes | CREATE (c)<-[:WROTE]-(pp))
        WITH c, g

        MATCH (g)-[r:FOR_CHALLENGE]->(p)
        WITH collect(p) as endNodes, c, g
        FOREACH(pp in endNodes | CREATE (c)-[:FOR_CHALLENGE]->(pp))
        WITH c, g

        MATCH (g)-[r:FOR_INDUSTRY]->(p)
        WITH collect(p) as endNodes, c, g
        FOREACH(pp in endNodes | CREATE (c)-[:FOR_INDUSTRY]->(pp))
        WITH c, g

        MATCH (g)-[r:FOR_USE_CASE]->(p)
        WITH collect(p) as endNodes, c, g
        FOREACH(pp in endNodes | CREATE (c)-[:FOR_USE_CASE]->(pp))
        WITH c, g

        MATCH (g)-[r:HAS_IMAGE]->(p)
        WITH collect(p) as endNodes, c, g
        FOREACH(pp in endNodes | CREATE (c)-[:HAS_IMAGE]->(pp))
        WITH c, g

        RETURN c
      `,
        {
          uuid: graphGistUUID,
          candidateUUID,
        }
      );
      await txc.commit();
    }

    return neo4jgraphql(obj, { uuid: candidateUUID }, context, info);
  } catch (error) {
    console.error(error);
    await txc.rollback();
  } finally {
    await session.close();
  }

  return null;
};
