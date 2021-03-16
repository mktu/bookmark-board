import React from "react";
type Props = React.SVGAttributes<SVGSVGElement>
const LogoSm: React.FC<Props> = ({
    ...props
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            fill="none"
            viewBox="0 0 268 178"
        >
            <rect width="77" height="98" x="88" y="3" fill="#263238" rx="20"></rect>
            <path fill="#263238" d="M103 3h158l-48.141 67L261 137H103V3z"></path>
            <path
                fill="#263238"
                d="M5 24h153c11.046 0 20 8.954 20 20v110c0 11.046-8.954 20-20 20H5V24z"
            ></path>
            <path stroke="#fff" strokeWidth="5" d="M179.5 36L179.5 148" ></path>
            <path
                stroke="#fff"
                strokeWidth="5"
                d="M105.443 5L166 24H3v151h151.393"
            ></path>
            <path
                stroke="#fff"
                strokeWidth="5"
                d="M180.935 137H263l-49.032-67.971L263 3H103M88 24c.606-5.698 4.454-17.874 15-21M154 174.911c9.253.831 27.164-3.789 24.785-28.911"
            ></path>
        </svg>
    );
}

export default LogoSm;