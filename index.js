import weaviate from 'weaviate-ts-client';
import { readFileSync, writeFileSync } from 'fs';

(async () => {
  try {
    // Initialize the Weaviate client
    const client = weaviate.client({
      scheme: 'http',
      host: 'localhost:8080',
    });

    // Fetch the schema just to make sure the database is up and running
    const schemaRes = await client.schema.getter().do();
    console.log(schemaRes);

    // Query an image (Make sure 'test.jpg' exists in the same folder)
    const test = Buffer.from(readFileSync('./test.jpeg')).toString('base64');
    const resImage = await client.graphql.get()
      .withClassName('Meme')
      .withFields(['image'])
      .withNearImage({ image: test })
      .withLimit(1)
      .do();

    // Write the result to the filesystem
    const result = resImage.data.Get.Meme[0].image;
    writeFileSync('./result.jpeg', result, 'base64');

    console.log('Image search completed successfully.');
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
