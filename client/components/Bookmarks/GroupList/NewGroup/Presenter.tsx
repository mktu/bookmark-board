type Props = {
    input: React.ReactNode,
    description: React.ReactNode,
    submit: React.ReactNode,
    cancel: React.ReactNode,
    error?: string
}

const Presenter: React.VFC<Props> = ({
    input,
    description,
    submit,
    cancel,
    error
}) => {
    const showError = error && (<div className='px-4 py-2 text-xs text-secondary-main'>{error}</div>)
    return (
        <div>
            <div className='mb-4 text-primary-main'>新しいグループを追加します</div>
            {input}
            {showError}
            <div className='mt-2'>
                {description}
            </div>
            <div className="mt-4 flex items-center justify-end">
                {cancel}
                {submit}
            </div>
        </div>
    )
}

export default Presenter