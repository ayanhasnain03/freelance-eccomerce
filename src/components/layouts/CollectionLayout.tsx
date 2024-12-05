
const CollectionLayout = ({children}: React.PropsWithChildren) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[70vh]">
            {children}
        </div>
    )
}

export default CollectionLayout
