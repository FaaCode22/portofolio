// src/utils/github.ts
export const fetchGitHubContributions = async (username: string, token: string) => {
    const query = `
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;
  
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
  
    const json = await res.json();
    return json.data.user.contributionsCollection.contributionCalendar.totalContributions;
  };
  