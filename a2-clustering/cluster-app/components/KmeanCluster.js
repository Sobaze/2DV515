

export default function KmeanCluster({state}) {

    return (
        <>
        <div>
            {state.result.map(bl => 
                <details>
                    <summary> {bl.Cluster + (' (' + bl.Blogs.length + ')' ) } </summary>
                        <ul>
                            {bl.Blogs.map(d => 
                                <li> {d} </li>
                                )
                            }
                        </ul>
                </details>
                )
            }
        </div>
        </>
    )
}