import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import { Button, Card, LoadingDots, PageTitle } from "~/components";
import { getArticleDetail } from "~/services/article-service";
import errorHandler from "~/lib/errorHandler";


function ArticleDetailPage () {
	const { detailId } = useParams()
	const [isFetching, setIsFetching] = useState(true)
	const [articleDetail, setArticleDetail] = useState(/** @type {Article} */ ({}))

	async function fetchArticle() {
		try {
			const res = await getArticleDetail(detailId)
			setArticleDetail(res)
		} catch (err) {
			errorHandler(err)
		} finally {
			setIsFetching(false)
		}
	}

	useEffect(() => {
		fetchArticle()
	}, [detailId])

	return <>
		<PageTitle title="Article Detail" />

		<Card>
			<Card.Header>
				<Card.Title title="Article Form" />

				<LoadingDots
					label="Please wait..."
					isLoading={isFetching}
				/>

				<Button
					title="Back"
					Icon={ChevronLeft}
					to="/article/list"
				/>
			</Card.Header>

			<section className="grid gap-4 lg:grid-cols-4">
				<h6>ID</h6>
				<p className="lg:col-span-3">: {articleDetail?.id}</p>

				<h6>Title</h6>
				<p className="lg:col-span-3">: {articleDetail?.title}</p>

				<h6>Tags</h6>
				<p className="lg:col-span-3">: {articleDetail?.tags?.join(', ')}</p>

				<h6>User ID</h6>
				<p className="lg:col-span-3">: {articleDetail?.userId}</p>

				<h6>Reactions</h6>
				<p className="lg:col-span-3">: {articleDetail?.reactions}</p>

				<h6>Body / Content</h6>
				<p className="lg:col-span-3">: {articleDetail?.body}</p>
			</section>
		</Card>
	</>
}

export default ArticleDetailPage