
customerUpdate.onshow=function(){
  query = "SELECT * FROM customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=aek25845&query=" + query)
  if (req.status == 200) { //transit trip worked. 
    results = JSON.parse(req.responseText)
    console.log(`the results are \n ${results}`)
    if (results.length == 0)
      lblMessageUpdate.value = "There are no customers in the database."
    else {
      let message = ""
      for (i = 0; i < results.length; i++)
        message = message + results[i][1] + "\n"
      txtaUpdatedList.value = message
    } // end else

  } else // the transit didn't work - bad wifi? server turned off?
    lblMessageUpdate.value = "Error code: " + req.status
}

buttonUpdate.onclick=function(){
  let newName = inpNewName.value
  let oldName = OldName.value
    query = "SELECT * FROM customer WHERE `name` = '" + oldName + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=aek25845&query=" + query)
    if (req.status == 200) {
        results = JSON.parse(req.responseText)
        if (results.length > 0) {
            query = "UPDATE customer SET `name` ='" + newName + "' WHERE `name` = '" + oldName + "'"
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=aek25845&query=" + query)
            if (req.status ==  200)  
                if (req.responseText == 500)   
                    lblMessageUpdate.textContent = `You have successfully updated ${oldName} to ${newName}.`
                else
                    lblMessageUpdate.textContent = `There was a problem updating ${oldName} to ${newName}.`
            else   
                lblMessageUpdate.textContent = `Error: ${req.status}`
        }
    } 
}
