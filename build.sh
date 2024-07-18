echo "Installing dependencies"
cd client
pnpm install --frozen-lockfile
cd ../server
pnpm install --frozen-lockfile
cd ..

echo "Building"
cd server
npm run build
mv dist ../dist
cd ../client
npm run build
mv dist ../dist/public
