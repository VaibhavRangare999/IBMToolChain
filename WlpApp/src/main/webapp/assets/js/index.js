import AppID from 'ibmcloud-appid-js';
import config from './config.json';

const $loginButton = document.getElementById('login');
const $welcome = document.getElementById('welcome');
const $afterLogin = document.getElementById('afterLogin');
const $welcomeNameId = document.getElementById('welcomeNameID');
const $tokenContent = document.getElementById('tokenContent');
const $userContent = document.getElementById('userContent');
const $error = document.getElementById('error');

const appID = new AppID();

async function onLoginButtonClick() {
	try {
		hideElement($loginButton);

		const tokens = await appID.signin();
		let userInfo = await appID.getUserInfo(tokens.accessToken);

		hideElement($welcome);
		showElement($afterLogin);

		let decodeIDToken = tokens.idTokenPayload;

		$welcomeNameId.textContent = 'Hi ' + decodeIDToken.name + ', Congratulations!';
		$tokenContent.textContent = JSON.stringify(decodeIDToken);
		$userContent.textContent = JSON.stringify(userInfo);
	} catch (e) {
		$error.textContent = e;
		showElement($loginButton);
	}
}

(async () => {
	try {
		await appID.init(config);
		showElement($loginButton);
		$loginButton.addEventListener('click', onLoginButtonClick);
	} catch (e) {
		$error.textContent = e;
	}
})();

function hideElement($element) {
	$element.classList.add('hidden');
}

function showElement($element) {
	$element.classList.remove('hidden');
}

const collaps = document.getElementsByClassName("collapsible");
for (let collapsible of collaps) {
	const btn = collapsible.getElementsByTagName("button")[0];
	btn.addEventListener("click", () => {
		collapsible.classList.toggle("active");
	});
}

