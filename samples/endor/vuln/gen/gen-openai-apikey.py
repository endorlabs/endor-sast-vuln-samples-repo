
    import openai
    import requests
    from requests.structures import CaseInsensitiveDict

    # Set your API key
    # ruleid: gen-openai-apikey
    openai.api_key = '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' # endorctl:allow
    # okruleid: gen-openai-apikey
    # OPENAI_API_KEY ="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" # endorctl:allow
    # okruleid: gen-openai-apikey
    OPENAI_API_KEY ="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    # Completion API example

    completion_request = {
        'engine': 'davinci',
        'prompt': 'Hello,',
        'max_tokens': 5
    }

    response = openai.Completion.create(**completion_request)
    print(response.choices[0].text)

    # Davinci Codex API example

    davinci_codex_request = {
        'prompt': 'Write a function that takes two numbers and returns their sum:',
        'temperature': 0.5,
        'max_tokens': 64
    }

    response = openai.Completion.create(engine="davinci-codex", **davinci_codex_request)
    print(response.choices[0].text)

    # Dall-E API example

    dalle_request = {
        'model': 'image-alpha-001',
        'prompt': 'an armchair in the shape of an avocado',
        'size': '256x256'
    }
    headers = CaseInsensitiveDict()
    headers['Content-Type'] = 'application/json'

    response = requests.post('https://api.openai.com/v1/images/generations', headers=headers, json=dalle_request)
    print(response.json()['data'][0]['url'])

    urllib.urlretrieve('https://api.openai.com/v1/images/generations')
    # GPT-3 API example
    gpt3_request = {
        'engine': 'davinci',
        'prompt': 'Once upon a time',
        'max_tokens': 10
    }

    response = openai.Completion.create(**gpt3_request)
    print(response.choices[0].text)



    openai.Completion.create(
    model="text-davinci-003",
    prompt="Say this is a test",
    max_tokens=7,
    temperature=0
    )




    openai.Model.retrieve("text-davinci-003")


    openai.organization = "org-DgIXxHbPwh0VJJ0G6k9iCKWA"
    openai.Model.list()

    def urllib_req1():
        import urllib.request as req

        with req.urlopen('https://api.openai.com/v1/images/generations') as f:
            print(f.read(100).decode('utf-8'))

    def urllib_req2():
        import urllib.request as req

        opener = req.build_opener()
        opener.addheaders = [('User-agent', 'Mozilla/5.0')]
        with opener.open('https://api.openai.com/v1/images/generations') as f:
            print(f.read(100).decode('utf-8'))


        import urllib.request as req

        r = req.Request('https://api.openai.com/v1/images/generations')
        r.timeout = None
        hdl = req.HTTPHandler()
        res = hdl.http_open(req=r)
        print(res.status)

    def urllib_legacy1():
        import urllib.request as req

        local_filename, headers = req.urlretrieve('https://api.openai.com/v1/images/generations')
        with open(local_filename) as html:
            print(html.read(100))

    def urllib_legacy2():
        '''
        Does not work on recent Python releases, which is why the function is not called in main.
        '''
        import urllib.request as req

        opener = req.URLopener()
        with opener.open_http('https://api.openai.com/v1/images/generations') as f:
            pass

    if __name__ == '__main__':
        urllib_req1()
        urllib_req2()
        urllib_req3()
        urllib_req4()
        urllib_legacy1()


        response = openai.Completion.create(engine=engine,
                                            prompt=prompt,
                                            max_tokens=max_tokens,
                                            temperature=temperature,
                                            top_p=top_p,
                                            presence_penalty=presence_penalty,
                                            frequency_penalty=frequency_penalty,
                                            echo=echo,
                                            stop=stop,
                                            n=n,
                                            stream=stream,
                                            logprobs=logprobs,
                                            best_of=best_of,
                                            logit_bias=logit_bias)
        logger.debug("GPT-3 Completion Result: {0}".format(response))
        return response


