## Frontend
The frontend is built upon ReactJS and 3rd party library to render markdown syntax correctly.
There are also some challenges and decisions.
1. The frontend cannot refetch the post posted by other users. I believe the update of this page would not be that frequent, otherwise, we should add a service like WebSocket to listen to the server's update.
2. I didn't implement the pagination for the same reason that there would not be a huge user base on this platform.
3. There is a potential JavaScript injection in Markdown, thus I follow the issues in GitHub of that 3rd party library https://github.com/uiwjs/react-md-editor/issues/249 and resolve the issue.

Thank you to visit my website. And feel free to leave comments on the social platform. Hope to see you all the next summer.
