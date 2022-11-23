
export default function SearchResult({state}) {
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Link</th>
                    <th>Score</th>
                    <th>Content</th>
                    <th>Location</th>
                    <th>PageRank</th>
                </tr>
            </thead>
            <tbody>
                {state.result.map(res => 
                    <tr key={res.linkId}>
                        <td> <a target="_blank" href={`https://en.wikipedia.org/wiki/${res.page.url}`} > { res.page.url} </a> </td>
                        <td>{res.score.toFixed(2)}</td>
                        <td>{res.content.toFixed(2)} </td>
                        <td>{res.location.toFixed(2)} </td>
                        <td>{res.pageRank.toFixed(2)} </td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    )
}