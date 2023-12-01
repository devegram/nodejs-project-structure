export default class {
    static $authorized = false;
	static $account = [];
	static $isRoot = false;
	static $permissions = false;

    identifyByToken (token) {
        let tokenBundle = _sys.singleton.jwt.verify(token)
        if (!tokenBundle) return false
        this.setAccount(tokenBundle.data.user.account)
        return true
    }

    setAccount (account)  {
        this.$account = account
        this.$authorized = true;
        this.$isRoot = this.isRoot();
        this.$permissions = this.$account.permissions ?? [];
    }

    isRoot () {
		return this.$account.access_profile_id == "ROOT";
	}
}
