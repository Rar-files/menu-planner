import Button from '@/ui/Button'

const meal = () => {
    return (
        <div
            className={`bg-docsMethod-get min-w-[calc(100vw-3rem)] shadow-lg flex flex-col`}
        >
            <div id="Toolbar" className={`flex flex-row justify-end m-3`}>
                <Button secondary outline bold icon="icon-[mdi--chevron-left]">
                    Test
                </Button>
            </div>
            <div
                id="Content"
                className={`grow mb-3 bg-docsMethod-post  rounded-lg`}
            >
                {' '}
                test
            </div>
        </div>
    )
}

export default meal
