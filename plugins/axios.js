export default function ({ $axios, redirect }) {
	$axios.onError(err => {
		switch (err.status) {
			case 400:
				redirect('/error/400')
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
