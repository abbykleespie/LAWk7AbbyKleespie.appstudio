
customerAdd.onshow=function(){
  query = "SELECT * FROM customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=aek25845&query=" + query)
  if (req.status == 200) { //transit trip worked. 
    results = JSON.parse(req.responseText)
    console.log(`the results are \n ${results}`)
    if (results.length == 0)
      addSuccess.value = "There are no customers in the database."
    else {
      let message = ""
      for (i = 0; i < results.length; i++)
        message = message + results[i][1] + "\n"
      txtaAddName.value = message
    } // end else

  } else // the transit didn't work - bad wifi? server turned off?
    addSuccess.value = "Error code: " + req.status
}

addCustomer.onclick=function(){
    query = "INSERT INTO customer (name,street,city,state,zipcode) VALUES ('Jesse Antiques', '1113 F St', 'Omaha', 'NE', '68178')"
    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=aek25845&query=" + query)
    if (req.status == 200) {
        if (req.responseText == 500)    
            addSuccess.textContent = "You have successfully added the customer!"
        else
            addSuccess.textContent = "There was a problem with adding the pet to the database."
    } else 
        addSuccess.textContent = "Error: " + req.status
}
