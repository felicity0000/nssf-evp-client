import man_working from './man_working.jpeg'
import nssf_logo from './nssf_logo.png'
import envelope from './envelope.png'
import lock from './lock-alt.png'

export const assets = {
    man_working,
    nssf_logo,
    envelope,
    lock
};

export const feedbacks = [
    {
      _id: "aaaa",
      title: "Poor Lighting in Office",
      category: "Work Environment",
      concern: "The lighting in the office is too dim, causing eye strain.",
      possibleSolution: "Install brighter LED lights and provide desk lamps.",
      validity: {
        startDate: "2023-10-01",
        endDate: "2023-10-31"
      },
      isAnonymous: true,
      status: "Pending",
      likes: 5,
      dislikes: 2
    },
    {
      id: "aaab",
      title: "Lack of Team Communication",
      category: "Management",
      concern: "Teams are not communicating effectively, leading to delays.",
      possibleSolution: "Schedule weekly team meetings and use collaboration tools like Slack.",
      validity: {
        startDate: "2023-10-05",
        endDate: "2023-11-05"
      },
      isAnonymous: false,
      status: "In Progress",
      likes: 10,
      dislikes: 1,
      name: "Jane Doe",
    },
    {
      id: "aaac",
      title: "Uncomfortable Chairs",
      category: "Work Environment",
      concern: "The office chairs are uncomfortable and causing back pain.",
      possibleSolution: "Replace chairs with ergonomic ones.",
      validity: {
        startDate: "2023-09-25",
        endDate: "2023-10-25"
      },
      isAnonymous: false,
      status: "Resolved",
      likes: 15,
      dislikes: 3,
      name: "John Doe",
    },
    {
      id: "aaad",
      title: "Inconsistent Internet Connection",
      category: "Infrastructure",
      concern: "The internet connection is unstable, affecting productivity.",
      possibleSolution: "Upgrade the internet plan and install additional routers.",
      validity: {
        startDate: "2023-10-10",
        endDate: "2023-11-10"
      },
      isAnonymous: true,
      status: "Pending",
      likes: 8,
      dislikes: 0
    },
    {
      id: "aaae",
      title: "Lack of Career Growth Opportunities",
      category: "Management",
      concern: "Employees feel there are no clear paths for career advancement.",
      possibleSolution: "Implement a mentorship program and provide training opportunities.",
      validity: {
        startDate: "2023-10-15",
        endDate: "2023-11-15"
      },
      isAnonymous: false,
      status: "In Progress",
      likes: 12,
      dislikes: 4
    },
    {
      id: "aaaf",
      title: "No Healthy Snack Options",
      category: "Facilities",
      concern: "The office pantry lacks healthy snack options.",
      possibleSolution: "Stock the pantry with fruits, nuts, and other healthy snacks.",
      validity: {
        startDate: "2023-10-03",
        endDate: "2023-11-03"
      },
      isAnonymous: true,
      status: "Resolved",
      likes: 20,
      dislikes: 2
    }
  ]