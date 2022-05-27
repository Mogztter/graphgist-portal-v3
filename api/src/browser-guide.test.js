import { convert } from "./brower-guide";

test('convert AsciiDoc document without proper structure', () => {
  const result = convert({
    asciidoc: `Recently, I was asked to pitch a method for providing recommendations.  Luckily, armed with the knowledge obtained from talks from Max De Marzi and https://skillsmatter.com/skillscasts/7298-modelling-a-recommendation-engine-a-worked-example[Mark Needham^] at a recent  Neo4j London Meetups, I knew this could be easily achieved with Neo4j.

The key issue with recommendation engines comes from the data.
Luckily, Neo4j comes bundled with the Northwind Graph Example.
The Northwind database is an infamous dataset containing purchase history that has been used to teach relational databases for years and was a great place to start.

You can import the Northwind database into a graph by following the http://neo4j.com/developer/guide-importing-data-and-etl/["Import Data into Neo4j"^] post on Neo4j or type the following into Neo4j's browser, e.g. empty database in Neo4j Desktop or a https://neo4j.com/sandbox[blank sandbox^].

----
:play northwind graph
----

Now we've got some data, let's start to explore the dataset.

=== Dataset

...
`
  });
  console.log({ result })
});

test('convert AsciiDoc document with preamble', () => {
  const result = convert({
    asciidoc: `= Northwind Recommendation Engine

Recently, I was asked to pitch a method for providing recommendations.  Luckily, armed with the knowledge obtained from talks from Max De Marzi and https://skillsmatter.com/skillscasts/7298-modelling-a-recommendation-engine-a-worked-example[Mark Needham^] at a recent  Neo4j London Meetups, I knew this could be easily achieved with Neo4j.

The key issue with recommendation engines comes from the data.
Luckily, Neo4j comes bundled with the Northwind Graph Example.
The Northwind database is an infamous dataset containing purchase history that has been used to teach relational databases for years and was a great place to start.

You can import the Northwind database into a graph by following the http://neo4j.com/developer/guide-importing-data-and-etl/["Import Data into Neo4j"^] post on Neo4j or type the following into Neo4j's browser, e.g. empty database in Neo4j Desktop or a https://neo4j.com/sandbox[blank sandbox^].

----
:play northwind graph
----

Now we've got some data, let's start to explore the dataset.

== Dataset

The Northwind Graph provides us with a rich dataset, but primarily we’re interested in Customers and their Orders. In a Graph, the data is modelled like so:
`
  });
  console.log({ result })
});
