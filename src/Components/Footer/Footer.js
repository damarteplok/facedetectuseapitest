import React from 'react';

const Footer = () => {
    return (
        <footer className='flex justify-center white-80 pv5 pv6-l ph4 '>
            <p className='f6'><span className='dib mr4 mr5-ns'>©2048 Your Company LLC, Inc.</span>
                <a className='link white-80 hover-light-purple' href=''>Terms</a> /
                <a className='link white-80 hover-gold' href=''> Privacy </a> /
                <a className='link white-80 hover-green' href=''>hi@yourcompany.com </a>
            </p>
        </footer>
    );
}
export default Footer;