
customerDelete.onshow = function() {
  query = "SELECT * FROM customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=aek25845&query=" + query)
  if (req.status == 200) { //transit trip worked. 
    results = JSON.parse(req.responseText)
    console.log(`the results are \n ${results}`)
    if (results.length == 0)
      lblMessage.value = "There are no customers in the database."
    else {
      let message = ""
      for (i = 0; i < results.length; i++)
        message = message + results[i][1] + "\n"
      txtaDeleteName.value = message
    } // end else

  } else // the transit didn't work - bad wifi? server turned off?
    lblMessage.value = "Error code: " + req.status
}



buttonDelete.onclick = function() {
  let customerNameDel = inpDeleteName.value
  let found = false
  for (i = 0; i < results.length; i++) {
    if (customerNameDel == results[i][1]) {
      found = true
      break
    }
  }
  if (found == false)
    lblMessageDel.textContent = "That customer name is not in the database."
  else if (found == true) {
    query = "DELETE FROM customer WHERE name = '" + customerNameDel + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=aek25845&query=" + query)
    if (req.status == 200) //transit worked.
      if (req.responseText == 500)
        lblMessageDel.textContent = `You have successfully deleted the pet named ${customerNameDel}`
      else
        lblMessageDel.textContent = `There was a problem deleting ${customerNameDel} from the database.`
    else
      lblMessageDel.textContent = `Error: ${req.status}`
  }
}














