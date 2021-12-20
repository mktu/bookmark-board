
type Props = {
    width : number,
    height : number,
    link:string
}
const AddFriend: React.VFC<Props> = ({
    link,
    height,
    width
}) => (
    <a href={link} target='_blank' rel='noopener noreferrer'><img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height={height} width={width} /></a>

)

export default AddFriend