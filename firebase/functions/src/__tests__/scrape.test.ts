import scrape from '../scrape'

describe('scraping tests', () => {
    test('simple scrape', async () => {
        const ret = await scrape('https://github.com/mktu/image_iterator')
        expect(JSON.stringify(ret)).toBe(JSON.stringify({
            title: 'GitHub - mktu/image_iterator',
            description: 'Contribute to mktu/image_iterator development by creating an account on GitHub.',
            url: 'https://github.com/mktu/image_iterator',
            images: [
                'https://opengraph.githubassets.com/5e87de91fbac5f0e8b9f51ed5371dcbd1c4cad8fa4fafd3db26aa4ddf60e9c34/mktu/image_iterator',
                'https://opengraph.githubassets.com/5e87de91fbac5f0e8b9f51ed5371dcbd1c4cad8fa4fafd3db26aa4ddf60e9c34/mktu/image_iterator'
            ]
        }));
    });

    test('twitter scrape', async () => {
        const ret = await scrape('https://twitter.com/mktu13/status/1467334593556934659?s=20')
        expect(JSON.stringify(ret)).toBe(JSON.stringify({
            title: 'mktu on Twitter',
            description: '“Next.js 12とnext-pwaの組み合わせでいつの間にかbad-precaching-responseエラーが...。こちら記載のquick fixでなんとか解消🙇‍♂️ https://t.co/teZvWzj8B3”',
            url: 'https://twitter.com/mktu13/status/1467334593556934659?s=20',
            images: [
                'https://pbs.twimg.com/card_img/1468926565438586881/21mtmJNd?format=jpg&name=600x314'
            ]
        }));
    })
})