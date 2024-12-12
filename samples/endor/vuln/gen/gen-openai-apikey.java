import ai.openai.api.APICompletionV1;
import ai.openai.api.models.CompletionRequest;
import ai.openai.api.models.CompletionResponse;

public class Main {
  public static void main(String[] args) {
    // ruleid: gen-openai-apikey
        API.apiKey = "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"; // endorctl:allow
    // okruleid: gen-openai-apikey
    //OPENAI_API_KEY="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"; endorctl:allow
       // okruleid: gen-openai-apikey
    OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    // okruleid: gen-openai-apikey
        API.apiKey = System.getenv("OPENAI_TOKEN");
    CompletionRequest request = new CompletionRequest.Builder()
        .prompt("Hello, world!")
        .maxTokens(5)
        .build();

    CompletionResponse response = api.complete(request);
    System.out.println(response.getChoices().get(0).getText());
  }
}

