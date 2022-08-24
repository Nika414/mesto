export class UserInfo {
    constructor(popup, userinfo) {
        this._profileName = document.querySelector(userinfo.name);
        this._profileAbout = document.querySelector(userinfo.about);
        this._profileAvatar = document.querySelector(userinfo.avatar);
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._profileName.textContent;
        userInfo.about = this._profileAbout.textContent;
        return userInfo;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileAbout.textContent = data.about;
        this._profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    }
}