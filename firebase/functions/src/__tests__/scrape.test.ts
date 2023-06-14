import scrape from '../scrape'

describe('scraping tests', () => {
    test('simple scrape', async () => {
        const ret = await scrape('https://github.com/mktu/image_iterator')
        expect(JSON.stringify(ret)).toBe(JSON.stringify({
            title: 'GitHub - mktu/image_iterator',
            description: 'Contribute to mktu/image_iterator development by creating an account on GitHub.',
            url: 'https://github.com/mktu/image_iterator',
            images: [
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
                'https://pbs.twimg.com/profile_images/1376173980625739785/JbhuJSE8_200x200.jpg'
            ]
        }));
    })

    test('imdb scrape', async () => {
        const ret = await scrape('https://www.imdb.com/title/tt10648342/')
        expect(JSON.stringify(ret)).toBe(JSON.stringify({
            title: 'Thor: Love and Thunder (2022) - IMDb',
            description: 'Thor: Love and Thunder: Directed by Taika Waititi. With Chris Hemsworth, Natalie Portman, Christian Bale, Tessa Thompson. Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.',
            url: 'https://www.imdb.com/title/tt10648342/',
            images: [
                'https://m.media-amazon.com/images/M/MV5BYmMxZWRiMTgtZjM0Ny00NDQxLWIxYWQtZDdlNDNkOTEzYTdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg'
            ]
        }));
    })
})