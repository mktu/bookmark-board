import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { PublicLayout } from '@components/Layout'
import PublicPageHeader from '@components/Header/PublicPageHeader'
import Footer from '@components/Footer'
import PublicBookmarks from '@components/PublicBookmarks'
import PublicBookmarkMeta from '@components/Meta/PublicBookmarkMeta'

const importFireStore = async () => {
  const { firebaseAdmin } = await import('../../services/firebaseServer')
  const { getFirestore } = await import('firebase-admin/firestore')
  return getFirestore(firebaseAdmin)
}

const PublicBookmarksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  group,
  profile,
  bookmarks,
  reactions
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div className='flex w-full items-center justify-center p-4 text-lg text-primary-main'>ページを準備中です...</div>
  }
  if (!group.sharable) {
    return <div className='flex w-full items-center justify-center p-4 text-lg text-primary-main'>非公開ページです</div>
  }
  return (
    <div>
      <PublicBookmarkMeta {...{ group, profile }} />
      <PublicLayout
        header={<PublicPageHeader />}
        main={<PublicBookmarks group={group} bookmarks={bookmarks} editor={profile} initReactions={reactions} />}
        footer={<Footer />}
      />
    </div>
  )
}

export const getStaticProps = async ({
  params
}) => {
  const { ids } = params
  const firestore = await importFireStore()
  const groupDoc = await firestore
    .collection('groups')
    .doc(ids[0])
    .get()
  const group: BookmarkGroup = {
    id: groupDoc.id,
    ...(groupDoc.data() as BookmarkGroup)
  }
  const profileDoc = await firestore
    .collection('profiles')
    .doc(group.owner)
    .get()
  const profile: Profile = {
    id: profileDoc.id,
    ...(profileDoc.data() as Profile)
  }

  const bookmarkDocs = await firestore
    .collection('groups')
    .doc(ids[0])
    .collection('bookmarks')
    .get()

  const reactionDocs = await firestore
    .collection('groups')
    .doc(ids[0])
    .collection('reactions')
    .get()

  const bookmarks: Bookmark[] = []
  const reactions: Reaction[] = []
  bookmarkDocs.forEach(b => {
    bookmarks.push({
      id: b.id,
      ...(b.data() as Bookmark)
    })
  })
  reactionDocs.forEach(r => {
    reactions.push({
      id: r.id,
      ...(r.data() as Reaction)
    })
  })
  return {
    props: {
      group,
      profile,
      bookmarks,
      reactions
    },
    revalidate: 1,
  }
}


export const getStaticPaths: GetStaticPaths<{ ids: string[] }> = async () => {

  const firestore = await importFireStore()

  const groupDocs = await firestore
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