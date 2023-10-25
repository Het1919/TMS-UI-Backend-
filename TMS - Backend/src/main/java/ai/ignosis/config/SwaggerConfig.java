package ai.ignosis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig
{
    @Bean
    public OpenAPI swagConfig()
    {
        return new OpenAPI()
                .info(new Info()
                        .title("Ignosis APIs")
                        .description("Ignosis Backend API Documentation")
                        .version("1.0"));
    }

}
