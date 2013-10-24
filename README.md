### Developer Setup:
* Bundle gems

```bash
$ bundle
```

* Initialize the database

```bash
$ rake db:create
$ rake db:migrate
```

* Create .env file to store API information

```bash
$ touch .env.development
```
    RDIO_CONSUMER_KEY=your_key
    RDIO_CONSUMER_SECRET=your_secret

Your app ID and secret can be generated [on Rdio](http://developer.rdio.com/apps/register)

* Seed database

```bash
$ rake db:seed
```
* Start Rails

```bash
$ rails server
```

### Tests:
* Setup the test environment:

```bash
$ rake db:test:prepare
```

* Run the tests:

```bash
$ rspec
```
