

export default function RecUsers({state}) {
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Users</th>
                    <th>ID</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {state.result.map(res => 
                    <tr key={res.UserId}>
                        <td>{res.Name}</td>
                        <td>{res.UserId}</td>
                        <td>{res.score.toFixed(4)}</td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    )
}