const createEmployeeRecord = (arrayOfEmpInfo) => {
  const employeeInfo = {
    firstName: arrayOfEmpInfo[0],
    familyName: arrayOfEmpInfo[1],
    title: arrayOfEmpInfo[2],
    payPerHour: arrayOfEmpInfo[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeInfo
}

const createEmployeeRecords = (row) => {
  const records = row.map(employee => {
    return createEmployeeRecord(employee)
  })
  return records
}

const createTimeInEvent = (empArray, timeInString) => {
  const event = {
    type: "TimeIn",
    date: timeInString.slice(0, 10),
    hour: parseInt(timeInString.slice(11))
  }
  empArray.timeInEvents.push(event)

  return empArray
}

const createTimeOutEvent = (empArray, timeOutString) => {
  const event = {
    type: "TimeOut",
    date: timeOutString.slice(0, 10),
    hour: parseInt(timeOutString.slice(11))
  }
  empArray.timeOutEvents.push(event)

  return empArray
}

const hoursWorkedOnDate = (employeeRecord, date) => {
  const timeIn = employeeRecord.timeInEvents.find(day => day.date === date)
  const timeOut = employeeRecord.timeOutEvents.find(day => day.date === date)
  return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = (employeeRecord, date) => {
  const hours = hoursWorkedOnDate(employeeRecord, date)
  const wage = employeeRecord.payPerHour
  return wage * hours
}

const allWagesFor = (employeeRecord) => {
  const daysWorked = employeeRecord.timeInEvents
  const money = []
  daysWorked.forEach(day => {
    const wages = wagesEarnedOnDate(employeeRecord, day.date)
    money.push(wages)
  })
  const reducer = (num, accumulator) => num + accumulator
  return money.reduce(reducer, 0)
}

const calculatePayroll = (employees) => {
  const money = []
  employees.forEach(employee => {
    const wages = allWagesFor(employee)
    money.push(wages)
  })
  const reducer = (num, accumulator) => num + accumulator
  return money.reduce(reducer, 0)
}

const findEmployeeByFirstName = (fn, name) => {
  const employees = fn
  const findEmployee = employees.find(employee => employee.firstName === name)
  return findEmployee
}
