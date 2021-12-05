export const EventTypes = {
    group: 'group',
    defaultGroup: 'defaultGroup',
    alwaysSelectGroup: 'alwaysSelectGroup'
}

export const groupMessage = (groups: {
    label: string,
    id: string,
}[], url: string, owner:string) => {
    return {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "グループを選択してください",
                    "weight": "bold",
                    "size": "md"
                },
                {
                    "type": "box",
                    "layout": "baseline",
                    "spacing": "sm",
                    "margin": "sm",
                    "contents": [
                        {
                            "type": "text",
                            "wrap": true,
                            "text": "💡 毎回グループを選択しなくて済むように、メニューから登録先グループを設定することをお勧めします",
                            "maxLines": 4,
                            "size": "sm",
                            "color": "#546e7a"
                        }
                    ]
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "margin": "lg",
                    "spacing": "sm",
                    "contents": groups.map((group) => ({
                        "type": "button",
                        "action": {
                            "type": "postback",
                            "label": group.label,
                            "data": `event=${EventTypes.group},groupId=${group.id},url=${url},owner=${owner}`
                        },
                        "margin": "none",
                        "height": "sm",
                        "offsetStart": "none"
                    }))
                }
            ]
        }
    }
}

export const bookmarkMessage = ({
    url, title, description, group, image, editLink
}: { url: string, title: string, description?: string, group?: string, image?: string, editLink:string }) => {
    return {
        "type": "bubble",
        "hero": {
            "type": "image",
            "url": image || "https://via.placeholder.com/600x390.png?text=No+Images",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
                "type": "uri",
                "uri": url
            }
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": title,
                    "weight": "bold",
                    "size": "xl"
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "margin": "lg",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "説明",
                                    "color": "#aaaaaa",
                                    "size": "sm",
                                    "flex": 1
                                },
                                {
                                    "type": "text",
                                    "text": description || '未設定',
                                    "wrap": true,
                                    "color": "#666666",
                                    "size": "sm",
                                    "flex": 5,
                                    "maxLines": 2
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "グループ",
                                    "color": "#aaaaaa",
                                    "size": "sm",
                                    "flex": 1
                                },
                                {
                                    "type": "text",
                                    "text": group || '未選択',
                                    "wrap": true,
                                    "color": "#666666",
                                    "size": "sm",
                                    "flex": 3
                                }
                            ]
                        },
                    ]
                }
            ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
                {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                        {
                            "type": "button",
                            "action": {
                                "type": "uri",
                                "label": "Bookmark-Boardで編集する",
                                "uri": editLink
                            }
                        }
                    ]
                }
            ],
            "flex": 0
        }
    }
}