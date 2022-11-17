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
                    content={<Sections.Top.Content handleLogin={handleLogin} />}
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
                />
            }
            plugin={
                <Layout.SideBySide
                    title={Sections.Plugin.Title}
                    content={Sections.Plugin.Content}
                    image={Sections.Plugin.Image}
                    imageLeft
                />
            }
            siginin={
                <Layout.Single
                    title={Sections.Signin.Title}
                    content={<Sections.Signin.Content />}
                />
            }
        />
    )
}

export default LP;