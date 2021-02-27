import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { PublicLayout } from '../../components/Layout'
import Header from '../../components/Header'
import PublicBookmarks from '../../components/PublicBookmarks'
import PublicBookmarkMeta from '../../components/Meta/PublicBookmarkMeta'

const PublicBookmarksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  group,
  profile,
  bookmarks
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div className='w-full p-4 flex items-center justify-center text-lg text-primary-main'>ページを準備中です...</div>
  }
  if (!group.sharable) {
    return <div className='w-full p-4 flex items-center justify-center text-lg text-primary-main'>非公開ページです</div>
  }
  return (
    <div>
      <PublicBookmarkMeta {...{group,profile}}/>
      <PublicLayout
        header={<Header />}
        main={<PublicBookmarks group={group} bookmarks={bookmarks} editor={profile} />}
      />
    </div>
  )
}

export const getStaticProps = async ({
  params
}) => {
  const { ids } = params
  const { firebaseAdmin } = await import('../../services/firebaseServer')
  const groupDoc = await firebaseAdmin.firestore()
    .collection('groups')
    .doc(ids[0])
    .get()
  const group: BookmarkGroup = {
    id: groupDoc.id,
    ...(groupDoc.data() as BookmarkGroup)
  }
  const profileDoc = await firebaseAdmin.firestore()
    .collection('profiles')
    .doc(group.owner)
    .get()
  const profile: Profile = {
    id: profileDoc.id,
    ...(profileDoc.data() as Profile)
  }

  const bookmarkDocs = await firebaseAdmin.firestore()
    .collection('groups')
    .doc(ids[0])
    .collection('bookmarks')
    .get()
  const bookmarks: Bookmark[] = []
  bookmarkDocs.forEach(b => {
    bookmarks.push({
      id: b.id,
      ...(b.data() as Bookmark)
    })
  })
  return {
    props: {
      group,
      profile,
      bookmarks
    },
    revalidate: 1,
  }
}


export const getStaticPaths: GetStaticPaths<{ ids: string[] }> = async () => {

  const { firebaseAdmin } = await import('../../services/firebaseServer')
  const groupDocs = await firebaseAdmin.firestore()
    .collection('groups')
    .where('sharable', '==', true)
    .get()

  const groups: string[] = []
  groupDocs.forEach(doc => {
    groups.push(doc.id)
  })

  return {
    paths: groups.map(id => {
      return {
        params: { ids: [id] }
      }
    }),
    fallback: true
  }
}

export default PublicBookmarksPage