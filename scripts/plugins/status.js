/**
 * This plugin logs build status informations to console on each rebuild.
 */
export function StatusPlugin() {
    return {
        name: 'status-plugin',
        setup(build) {
            let startTime = 0;

            build.onStart(() => {
                startTime = Date.now();
            });

            build.onEnd(() => {
                const currentTime = new Date(startTime).toLocaleTimeString('en-US', { hour12: false }),
                    elapsedTime = Date.now() - startTime;

                console.log(`[${ currentTime }] Compiled in ${ elapsedTime }ms`);
            });
        },
    };
}
