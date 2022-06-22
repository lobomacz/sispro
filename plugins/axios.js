export default function ({ $axios, redirect }) {
	$axios.onError(error => {
		const code = parseInt(error.response && error.response.status)
		switch (code) {
			case 400:
				redirect('/error/400')
				break
			case 404:
				redirect('/error/404')
				break
			case 500:
				redirect('/error/500')
				break
			default:
				redirect('/error')
				break
		}
	})
}
