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

    // Define the schema configuration
    const schemaConfig = {
      class: 'Meme',
      vectorizer: 'img2vec-neural',
      vectorIndexType: 'hnsw',
      moduleConfig: {
        'img2vec-neural': {
          imageFields: ['image'],
        },
      },
      properties: [
        {
          name: 'image',
          dataType: ['blob'],
        },
        {
          name: 'text',
          dataType: ['string'],
        },
      ],
    };

    // Create the schema
    await client.schema.classCreator().withClass(schemaConfig).do();

    // Store an image (Make sure 'hi-mom.jpg' exists in the 'img' folder)
    const img1 = readFileSync('./img/meme1.jpeg');
    const img2 = readFileSync('./img/meme2.jpeg');
    const img3 = readFileSync('./img/meme3.jpeg');
    const img4 = readFileSync('./img/meme4.jpeg');
    const img5 = readFileSync('./img/meme5.jpeg');
    const img6 = readFileSync('./img/meme6.jpeg');

    const b64_1 = Buffer.from(img1).toString('base64');
    const b64_2 = Buffer.from(img2).toString('base64');
    const b64_3 = Buffer.from(img3).toString('base64');
    const b64_4 = Buffer.from(img4).toString('base64');
    const b64_5 = Buffer.from(img5).toString('base64');
    const b64_6 = Buffer.from(img6).toString('base64');

    await client.data.creator()
      .withClassName('Meme')
      .withProperties({
        image: b64_1,
        text: 'random meme 1',
      })
      .do();

    await client.data.creator()
      .withClassName('Meme')
      .withProperties({
        image: b64_2,
        text: 'random meme 2',
      })
      .do();

    await client.data.creator()
      .withClassName('Meme')
      .withProperties({
        image: b64_3,
        text: 'random meme 3',
      })
      .do();

    await client.data.creator()
      .withClassName('Meme')
      .withProperties({
        image: b64_4,
        text: 'random meme 4',
      })
      .do();
    
    await client.data.creator()
      .withClassName('Meme')
      .withProperties({
        image: b64_5,
        text: 'random meme 5',
      })
      .do();

    await client.data.creator()
      .withClassName('Meme')
      .withProperties({
        image: b64_6,
        text: 'random meme 6',
      })
      .do();

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
