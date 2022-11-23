
export default function SelectUser ({label, value, state,  onSelectUser}) {
        return (
          <>
            <div>
              <label className="label">{label}</label>
              <div>
                <select 
                  placeholder='User'
                  value={value}
                  onChange={onSelectUser}
                >
                  <option value=''> --Choose user </option>
                  {state.users.map((user) => (
                    <option key={user.UserId} value={user.UserId}>
                      { user.UserId + ": " + user.Name}
                    </option>
                  ))}
                </select>
              </div>
              
            </div>
          </>
        )
}