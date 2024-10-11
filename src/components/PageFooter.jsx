import React from "react";

export default function PageFooter() {
    return (
        <div>
            <p className="links">
                <span className="linkItem">友情链接：</span>
                <a
                    href="http://www.yuanjin.tech/"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    袁进的博客
                </a>
                <a
                    href="http://yanhongzhi.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    Mr.Yan
                </a>
            </p>
            <p>© 2024 - Coder Station</p>
            <p>Powered by Create React App</p>
        </div>
    );
}
