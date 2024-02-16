echo "Installing dependencies"
cd client
npm install
cd ../server
npm install

echo "Building"
cd ../client
npm run build
mv dist ../server
cd ../server
npm run tsc
