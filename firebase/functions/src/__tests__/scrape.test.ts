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
                'https://pbs.twimg.com/profile_images/1376173980625739785/JbhuJSE8_200x200.jpg'
            ]
        }));
    })

    test('imdb scrpe', async () => {
        const ret = await scrape('https://www.imdb.com/title/tt1745960/')
        expect(JSON.stringify(ret)).toBe(JSON.stringify({
            title: 'Top Gun: Maverick (2022) - IMDb',
            description: "Top Gun: Maverick: Directed by Joseph Kosinski. With Tom Cruise, Val Kilmer, Miles Teller, Jennifer Connelly. After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
            url: 'https://www.imdb.com/title/tt1745960/',
            images: [
                'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_FMjpg_UX1000_.jpg'
            ]
        }));
    })
})