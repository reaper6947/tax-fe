/** @type {import('next').NextConfig} */


module.exports = {
    output: 'standalone',
    compiler: {
        styledComponents: {
            ssr: true
        }
    }
};