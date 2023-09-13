# Image Search Engine with Weaviate

This is a simple Image Search Engine application that uses Weaviate to perform image searches in a vector database. It demonstrates the following steps:

1. Initializing the Weaviate client.
2. Fetching the schema to ensure the database is up and running.
3. Creating a schema that contains an image property.
4. Storing images in the database, each associated with a unique text description.
5. Querying an image and finding similar images in the database.
6. Saving similar images to the filesystem.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- NPM (Node Package Manager)
- Docker (to run Weaviate)

## Setup

1. Install the required Node.js packages by running the following command in the project directory:

npm install

## Usage
Run the application using Node.js:

First, run app.js.
After the schema has been added, you can just run node index.js.
This will execute the code and perform the following actions:

Initialize the Weaviate client.
Fetch the Weaviate schema to ensure the database is running.
Create a schema configuration for storing images and text descriptions.
Store six sample images along with their text descriptions in the database.
Query one of the sample images to find similar images.
Save similar images to the filesystem in the results directory.
After running the application, you can check the results directory for the saved similar images.

Folder Structure: 
img: Contains sample images to be stored and used for queries.
results: The directory where similar images will be saved.

Notes: 
Make sure that the sample images (meme1.jpeg to meme6.jpeg) exist in the img directory before running the application.
And the test.jpeg should be just in the project directory. 
