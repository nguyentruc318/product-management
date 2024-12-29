// permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          permissions.push({ id: input.value, permissions: [] });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });
    console.log(permissions);
    if (permissions.length > 0) {
      const form = document.getElementById("form-change-permissions");
      const inputPermissions = form.querySelector("[name='permissions']");
      inputPermissions.value = JSON.stringify(permissions);
      form.submit();
    }
  });
}
// end permissions
// Permission data default
const dataRecords = document.querySelector("[data-records]")
  if(dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"))
    console.log(records)
    const tablePermissions = document.querySelector("[table-permissions]")
    records.forEach((record,index)=>{
      const permissions = record.permission
      console.log(permissions)
      permissions.forEach((permission)=>{
        console.log(permission)
        const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
        if (!row) {
          console.error(`Không tìm thấy hàng với data-name="${permission}"`);
          return;
        }
        console.log(row)
        const input = row.querySelectorAll("input")[index]
        input.checked= true
      })
    })
  }

