
export default function MovieRec({state}) {
    return (
        <>
        <table >
            <thead>
                <tr>
                    <th>Movie</th>
                    <th>ID</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {state.result.map(res => 
                    <tr key={res.movieId}>
                        <td>{res.title}</td>
                        <td>{res.movieId}</td>
                        <td>{res.score.toFixed(4)}</td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    )
}