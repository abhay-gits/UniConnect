export const protect = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);
  
  if( username == 'admin' && password == 'admin' ) {
    next();
  } else {
    res.status(401).json({ message: 'Login Failed' });
  }
}