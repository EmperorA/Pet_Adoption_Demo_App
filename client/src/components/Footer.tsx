export default function Footer() {

    const currentYear = new Date().getFullYear()

    return(
        <footer>
            <p>&copy; {currentYear} 
                <a href="https://www.github.com/EmperorA">
                    Austine Uwumwonse.
                </a> 
            All rights reserved  
            </p>
        </footer>
    )
}