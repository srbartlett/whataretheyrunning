# What Are They Running

Unsure who to vote for at the 2013 Australian federal election?

Does one party favour open-source more than the other?

Using data from [OpenAustralia.org][] every member of the House of Represenatives
with a person website is checked. A `HEAD` request is issued to their website and
the corresponding HTTP headers are used to determine their operating system and Web server.

[OpenAustralia.org]: http://www.openaustralia.org/

## Usage

To collect data for each member if the House of Represenativies run the following
command:

    git clone https://github.com/srbartlett/whataretheyrunning.git
    cd whataretheyrunning
    gem install nokogiri thor
    ./bin/whataretheyrunning ask_for_head

This will output a json file that can be used for analysis. The `index.html`
file in this repository uses this file to visualise what parties uses open-source.

## Hosting


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


