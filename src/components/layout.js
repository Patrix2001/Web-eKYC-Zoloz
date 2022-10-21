import Navbar from './navbar'

export default function Layout({ children }) {
    return (
        <div className='min-h-screen'>
            <Navbar />
            <main className='top-20 relative p-5'>
                {children}
            </main>
        </div>
    )
}
