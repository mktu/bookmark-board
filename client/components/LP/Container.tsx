import React from 'react'
import { useRouter } from 'next/router'
import * as Layout from './Layout'
import * as Sections from './Sections'

const LP = () => {
    const router = useRouter();
    const handleLogin = () => {
        router.push('/signin')
    }

    return (
        <Layout.Page
            top={
                <Layout.SideBySide
                    title={Sections.Top.Title}
                    content={Sections.Top.Content}
                    image={Sections.Top.Image}
                />}
            topics={
                <Layout.Topics
                    title={Sections.Topics.Title}
                    topics={Sections.Topics.Topics}
                />}
            publish={
                <Layout.SideBySide
                    title={Sections.Publish.Title}
                    content={Sections.Publish.Content}
                    image={Sections.Publish.Image}
                />}
            siginin={
                <Layout.Single
                    title={Sections.Signin.Title}
                    content={<Sections.Signin.Content handleLogin={handleLogin}/>}
                />
            }
        />
    )
}

export default LP;