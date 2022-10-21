import Navbar from './navbar'

export default function Layout({ children }) {
    return (
        <div className='min-h-screen relative'>
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    )
}
