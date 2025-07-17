import { FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white text-black dark:text-white py-4 text-center flex flex-col items-center sm:flex-row sm:justify-between sm:px-6 dark:bg-gray-900">
            <p className="text-sm font-semibold ">© {new Date().getFullYear()} Waiting Vaya All rights reserved.</p>
            <a href="https://www.facebook.com/waitingvaya2891?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300 mt-2 sm:mt-0 flex items-center">
                <FaFacebook className="mr-2" />
                Follow us on Facebook
            </a>
        </footer>
    );
}

export default Footer;