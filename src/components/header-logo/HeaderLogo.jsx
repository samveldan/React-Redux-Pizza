import "./headerLogo.scss";

const HeaderLogo = () => {
    return (
        <div className="header__logo">
            <div className="header__logo-inner">
                <img src={require("../../assets/images/logo.png")} alt="" />
                <div className="header__logo-text">
                    <h2>react pizza</h2>
                    <span>самая вкусная пицца во вселенной</span>
                </div>
            </div>
        </div>
    );
}
 
export default HeaderLogo;